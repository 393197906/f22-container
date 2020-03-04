pname="{{productName}}-{{env}}-{{port}}-xindong-front-deploy:{{version}}"
docker stop  ${pname}
docker rm  ${pname}
docker rmi  ${pname}
docker build . -t  ${pname}
docker run --name  ${pname} -p {{port}}:80  -d  ${pname}
