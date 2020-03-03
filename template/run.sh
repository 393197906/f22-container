pname = "{{productName}}-{{env}}-{{version}}-xindong-front-deploy"
docker stop  ${pname}
docker rm  ${pname}
docker rmi  ${pname}
docker build . -t  ${pname}
docker run --name  ${pname} -p 9001:80  -d  ${pname}
