#!/bin/bash

# update config env
current_env=$negEnv
apiHost=$apiHost

host=""

# set env default value
if [ -z "$current_env" ]; then
    current_env="gdev"
fi

# set host
if [ $current_env == 'gdev' ]; then
  host="http://10.16.75.27:8202/newegg-central-2/v1"
elif [ $current_env == 'gqc' ]; then
  host="http://10.1.24.130:8202/newegg-central-2/v1"
elif [ $current_env == 'prdtesting' ]; then
  host="http://sandboxapis.newegg.org/newegg-central-2/v1"
elif [ $current_env == 'prd' ]; then
  host="http://apis.newegg.org/newegg-central-2/v1" 
fi

if [ $apiHost != '' ]; then
  host=$apiHost
fi

# print host
echo $host

# replace api host
sed -i "s|http://10.16.75.27:8202/newegg-central-2/v1|$host|" /dist/index.html

# startup nginx

set -eo pipefail

key=${C_KEY}
backend=${C_BACKEND}
nodes=${C_NODES}
watch=${C_WATCH:-true}
cmd="confd -watch=$watch"
tomlFile="/etc/confd/conf.d/nginx.toml"
templateFile="/etc/confd/templates/nginx.tmpl"

function genTomlFile()
{
  if [ -f "$tomlFile" ]; then
    rm -f $tomlFile
  fi
  echo -e "[template]" >> $tomlFile
  echo -e "src = \"nginx.tmpl\"" >> $tomlFile
  echo -e "dest = \"/etc/nginx/nginx.conf\"" >> $tomlFile
  echo -e "keys = [ \"$1\" ]" >> $tomlFile
  # echo -e "check_cmd = \"nginx -t\"" >> $tomlFile
  echo -e "reload_cmd = \"nginx -s reload\"" >> $tomlFile
}

function genTemplateFile()
{
  if [ -f "$templateFile" ]; then
    rm -f $templateFile
  fi
  echo -e "{{ getv \"$1\" }}" >> $templateFile
}

if [ -n "$key" ]
then
  genTomlFile $key
  genTemplateFile $key
else
  echo "C_KEY is required."
  exit -1
fi

if [ -n "$backend" ];
then
  cmd=${cmd}" -backend "$backend
fi

if [ -n "$nodes" ];
then
  nodeArr=(${nodes//,/ })
  for node in ${nodeArr[@]}
  do
    cmd=${cmd}" -node "$node
  done
fi

echo "[nginx-confd] $cmd"

# Run confd in the background to watch the upstream servers
cmd=${cmd}" &"
eval $cmd
echo "[nginx-confd] confd is listening for changes on $backend..."

# Start nginx
echo "[nginx-confd] starting nginx service..."
nginx -g "daemon off;"

