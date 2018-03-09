FROM docker.neg/edi/ngas2-ci-ubuntu:1.0.9

MAINTAINER Terry.Y.Ren <terry.y.ren@newegg.com>

# add source code folder
ADD . /tmp/build/

# install pip package
RUN cd /tmp/build && \
    mkdir /usr/local/ngas2 && \
    cp -r configuration /usr/local/ngas2/configuration && \
    cp app.py /usr/local/ngas2/app.py && \
    pip install --trusted-host 10.16.78.86 --extra-index-url http://10.16.78.86/simple -r requirements.txt && \
    python setup.py install

# clean tmp folder
RUN chmod +x /usr/local/ngas2/app.py && \
    rm -rf /tmp/* 

EXPOSE 8000

# Define working directory. 
WORKDIR /usr/local/ngas2 

# Define default command. 
CMD ["python","/usr/local/ngas2/app.py"]
