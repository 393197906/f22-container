pname="{{productName}}-{{env}}-{{version}}-{{port}}-xindong-front-deploy"
docker stop  ${pname}
docker rm  ${pname}
docker rmi  ${pname}
docker build . -t  ${pname}
docker run --name  ${pname} -p {{port}}:80  -d  ${pname}
