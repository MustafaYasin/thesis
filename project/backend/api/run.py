from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse
from pymongo import MongoClient


app = Flask(__name__, static_url_path='/static')
CORS(app)
api = Api(app)

class RecommendCoFounder(Resource):
    @cross_origin()
    def get(self):
        query_param_parser = reqparse.RequestParser()
        query_param_parser.add_argument('domain', location='args', type=str, required=True)
        args = query_param_parser.parse_args()
        domain = args['domain']

        client = MongoClient("mongodb+srv://mustafa:mustafa@cluster0.jzvhgwl.mongodb.net/?retryWrites=true&w=majority")
        db = client['profile']
        real_profile_db = db['real_user']
        
        result = real_profile_db.find({}, {'readme': 0, '_id': 0}).sort([(domain, -1)]).limit(50)

        if not result:
            return {'message': 'No user found'}, 404
        recommended_users = list(result)
        return {'recommended_users': recommended_users}, 200



api.add_resource(RecommendCoFounder, '/recommend')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)




