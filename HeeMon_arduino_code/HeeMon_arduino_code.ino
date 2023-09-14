//BIBLIOTECAS NECESSÁRIAS
#include "EmonLib.h"    // Emon Library : cálculos para os sensores.
#include <Bridge.h>
#include <LiquidCrystal_I2C.h>

//definições LCD
#define endereco  0x27
#define colunas   16
#define linhas    2

//definição botão pressão e pino onde está ligado
#define pushButton 5

//objeto lcd
LiquidCrystal_I2C lcd(endereco, colunas, linhas);

//Variáveis dos sensores
EnergyMonitor emon1;                  // Instância de um objeto monitor de energia da Emon Library.
const int CT_PIN = A1;                // Pino onde está conectado o sinal do sensor de corrente.
const int VT_PIN = A3;                // Pino onde está conectado o sinal do sensor de tensão.
const int CT_CALIBRATION = 60;        // valor de calibração do sensor de corrente
const int VT_CALIBRATION = 600;       // valor de calibração do sensor de tensão

//Variavel global para contar o nr de push no botão
int pressCount = 0;
int currState = LOW;
int prevState = LOW;

//Definições iniciais
void setup(){

  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(5, 0);
  lcd.print("HeeMon");
  lcd.setCursor(0, 1);
  lcd.print("Save your energy");

  pinMode (pushButton, INPUT);
  digitalWrite(pushButton, HIGH);

  emon1.voltage(VT_PIN, VT_CALIBRATION, 1.7); //Calibração do sensor tensão ZMPT101B
  emon1.current(CT_PIN, CT_CALIBRATION);      //Calibração do sensor corrente SCT-013-100.

  Serial.begin(9600);
  Bridge.begin();

  delay(5000);
  lcd.clear();
}

//Medição dos parametros de energia captados pelos sensores, realpower, apparent power, Vrms, Irms, power factor.
void calculoParametrosEnergia(){

  emon1.calcVI(20,2000);    
  float Irms = emon1.Irms;
  float Vrms = emon1.Vrms;
  float potenciaAtiva = emon1.realPower/1000;
  float potenciaAparente = emon1.apparentPower/1000;
  float fatorPotencia = emon1.powerFactor;

  filtroDadosEnergia(&Irms, &Vrms, &potenciaAtiva, &potenciaAparente, &fatorPotencia);

  //Envia os valores para o LCD
  sendDisplay(Irms, Vrms, potenciaAtiva, potenciaAparente, fatorPotencia);
  //Envia os valores para a bridge
  sendBridge(Irms, Vrms, potenciaAtiva, potenciaAparente, fatorPotencia);
}

void sendBridge(float Irms, float Vrms, float potenciaAtiva, float potenciaAparente, float fatorPotencia){

  String sensorData = String(Vrms) + ";" +
                      String(Irms) + ";" +
                      String(potenciaAtiva) + ";" +
                      String(potenciaAparente) + ";" +
                      String(fatorPotencia);

  // Envia os dados para o linino através da bridge
  Bridge.put("data", sensorData);
  //Serial.println(sensorData);
}

//Controlo de linhas do LCD
void sendDisplay(float Irms, float Vrms, float potenciaAtiva, float potenciaAparente, float fatorPotencia){

  switch(pressCount){
     case 0:
        setDisplayLines("Voltage:", Vrms, "V  ", "Current:", Irms, "A  ");
        break;
     case 1:
        setDisplayLines("Act.Pwr:", potenciaAtiva, "kW ", "Apa.Pwr:", potenciaAparente, "kVA");
        break;
     case 2:
        setDisplayLines("Pwr.Fac:", fatorPotencia, "   ", "", NULL , "");
        break;
  }
}

//monitorizar botão pressão
void pushCount(){

  currState = digitalRead(pushButton);

  if(currState != prevState){
      if(currState == LOW){
        pressCount++;
        if(pressCount >= 3)
          pressCount = 0;
      }
  }
  prevState = currState;
}

//Construção linhas no LCD
void setDisplayLines(String MEASURE1, float VALUE1, String UNIT1, String MEASURE2, float VALUE2, String UNIT2){

  if(pressCount==2){
    //Primeira linha
    lcd.setCursor(0, 0);
    lcd.print(MEASURE1);
    lcd.setCursor(9, 0);
    lcd.print(VALUE1);
    lcd.setCursor(12, 0);
    lcd.print(" ");
    lcd.setCursor(13, 0);
    lcd.print(UNIT1);
    //segunda linha
    lcd.setCursor(0, 1);
    lcd.print("                 ");
  }
  else{
    //primeira linha
    lcd.setCursor(0, 0);
    lcd.print(MEASURE1);
    lcd.setCursor(9, 0);
    lcd.print(VALUE1);
    lcd.setCursor(12, 0);
    lcd.print(" ");
    lcd.setCursor(13, 0);
    lcd.print(UNIT1);
    //segunda linha
    lcd.setCursor(0, 1);
    lcd.print(MEASURE2);
    lcd.setCursor(9, 1);
    lcd.print(VALUE2);
    lcd.setCursor(12, 1);
    lcd.print(" ");
    lcd.setCursor(13, 1);
    lcd.print(UNIT2);
  }
}

//Filtra pequenos valores que são captados pelos sensores, considerado aqui como ruído
void filtroDadosEnergia(float *Irms, float *Vrms, float *potenciaAtiva, float *potenciaAparente, float *fatorPotencia){

  if (*Irms < 0.4){
    *Irms = 0;
    *potenciaAtiva = 0;
    *potenciaAparente = 0;
    *fatorPotencia = 0;
    if(*Vrms < 100)
      *Vrms = 0;
  }
}

void loop(){

  pushCount();

  calculoParametrosEnergia();

  return 0;
}