while [ 1 ]
do
	echo "Starting auto-update process"
	echo "Pulling from repo"
	git pull
	echo "Latest commit aquired"
	echo "Starting bot"
	TOKEN=example node index.js
done;