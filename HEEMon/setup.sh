#!/bin/sh

# Function to run a script in the background
run_scripts() {
    cd /root/HEEMon
	python runServer.py &
}

# Trap SIGINT (Ctrl+C) to stop the background processes and exit
trap "kill 0" SIGINT

# Run the scripts in the background
run_scripts

# Wait for the user to interrupt the script (Ctrl+C)
wait

