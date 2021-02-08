import cherrypy
import logging
import os
import json
import urllib

from datetime import datetime

# Get logging name, set detail level, set formatting
logging.getLogger(__name__)
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

class MinFi(object):
    
    @cherrypy.expose
    def index(self):
        logging.debug('entering service#index')
        return open('index.html')

cherrypy.quickstart(MinFi(), '/', "/config/server.conf")