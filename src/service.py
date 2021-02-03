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
    def random(self):
        logging.debug('entering service#random')
        response_obj = {}

        try:
            pass
        except Exception as e:
            logging.error('error placeholder')
        
        return response_obj

cherrypy.quickstart(MinFi(), '/', "/config/server.conf")