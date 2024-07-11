import time

from flask import Blueprint, jsonify, request
from analysis import dataanalyzer
from analysis.dataanalyzer import *
from models.GraphComponent import *
from analysis.getLatestNews import *
from analysis.dataprocessor import getDataTable
import json

function = Blueprint('function',__name__)

@function.route('/predict', methods=['POST'])
def contact():
    json_data = request.get_json()
    form_data = dict(json_data)
    print(form_data)
    predicted_value = getPredictedValue(form_data)
    result = predicted_value
    return jsonify(result)

@function.route('/get-graph-component/<param>')
def graph_component(param):
    print("Graph type:",param)
    if param=="population":
        info = dataanalyzer.getYearVersusPopulationInfo()
        return vars(info);
    elif param=="inflation":
        info = dataanalyzer.getYearVersusInflationInfo()
        return vars(info);
    elif param=="gold-price":
        info = dataanalyzer.getYearVersusGoldPriceInfo()
        return vars(info);
    elif param=="oil-price":
        info = dataanalyzer.getYearVersusOilPriceInfo()
        return vars(info);
    elif param=="s_p-index":
        info = dataanalyzer.getYearVersusS_PindexInfo()
        return vars(info);
    elif param=="gni":
        info = dataanalyzer.getYearVersusGNIInfo()
        return vars(info);
    elif param=="realestate-index":
        info = dataanalyzer.getYearVersusRealestateindexInfo()
        return vars(info);
    elif param=="IT-index":
        info = dataanalyzer.getYearVersusITindexInfo()
        return vars(info);
    else:
        print("Graph type does not exist")
        return None;

@function.route('/fetch-news', methods=['GET'])
def getNews():
    type = request.args.get('type', default="", type=str)
    print(f"News type: {type}")
    result = get_latest_news(type)
    try:
        return jsonify(result['news'][0]['text'])
    except Exception as e:
        print(e)
        return jsonify("Error occured: Network issue / unable to fetch news")

@function.route('/fetch-data-table')
def fetchDataTable():
    result = getDataTable()
    json_result = result.to_json(orient='records')
    json_result = json_result.replace('\/', '/')
    print(json_result)
    json_result = json.dumps(json_result)
    return json_result
