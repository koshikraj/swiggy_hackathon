import falcon
import os
import mimetypes
from wsgiref import simple_server
from controller import *
WEBSITE_BASE_URL = '0.0.0.0'
WEBSITE_BASE_PORT = 80
# from project.component import *


apps = falcon.API()
apps.add_route("/get-distance/", GetData())
apps.add_route("/post-distance/", PostData())
apps.add_route("/api/category/{restaurant_id}", Category())
apps.add_route("/api/get_hash/{block_id}", GetHash())
apps.add_route("/api/get_owner_data/{assets_id}", OwnerData())

if __name__ == "__main__":
    def static(req, res, static_dir='static', index_file='index.html'):
        path = static_dir + req.path
        if req.path == '/':
            path += index_file
        if os.path.isfile(path):
            res.content_type = mimetypes.guess_type(path)[0]
            res.status = falcon.HTTP_200
            res.stream = open(path)
        else:
            res.status = falcon.HTTP_404

    apps.add_sink(static)

    host = WEBSITE_BASE_URL
    port = WEBSITE_BASE_PORT
    httpd = simple_server.make_server(host, port, apps)
    print("Serving on %s:%s" % (host, port))
    httpd.serve_forever()