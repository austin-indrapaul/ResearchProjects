from analysis import dataprocessor
from analysis.dataprocessor import *
from models.GraphComponent import *

def getAiRespose():
    return "Hello world"

def getYearVersusPopulationInfo():
    image_path = dataprocessor.getYearVersusGraph("population")
    info = GraphComponent()
    info.setImagePath(image_path)
    info.setDescription("")
    info.setExternalLink("")
    return info

def getYearVersusInflationInfo():
    image_path = dataprocessor.getYearVersusGraph("Inflation")
    info = GraphComponent()
    info.setImagePath(image_path)
    info.setDescription("")
    info.setExternalLink("")
    return info

def getYearVersusGoldPriceInfo():
    image_path = dataprocessor.getYearVersusGraph("Gold price")
    info = GraphComponent()
    info.setImagePath(image_path)
    info.setDescription("")
    info.setExternalLink("")
    return info

def getYearVersusOilPriceInfo():
    image_path = dataprocessor.getYearVersusGraph("Oil price")
    info = GraphComponent()
    info.setImagePath(image_path)
    info.setDescription("")
    info.setExternalLink("https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=pet&s=f000000__3&f=m")
    return info


def getYearVersusS_PindexInfo():
    image_path = dataprocessor.getYearVersusGraph("S&P index")
    info = GraphComponent()
    info.setImagePath(image_path)
    info.setDescription("")
    info.setExternalLink("")
    return info


def getYearVersusGNIInfo():
    image_path = dataprocessor.getYearVersusGraph("GNI")
    info = GraphComponent()
    info.setImagePath(image_path)
    info.setDescription("")
    info.setExternalLink("")
    return info


def getYearVersusRealestateindexInfo():
    image_path = dataprocessor.getYearVersusGraph("Realestate index")
    info = GraphComponent()
    info.setImagePath(image_path)
    info.setDescription("")
    info.setExternalLink("")
    return info

def getYearVersusITindexInfo():
    image_path = dataprocessor.getYearVersusGraph("IT index")
    info = GraphComponent()
    info.setImagePath(image_path)
    info.setDescription("")
    info.setExternalLink("")
    return info


def getPredictedValue(formData):
    population = float(formData['population'])
    oilPrice = float(formData['oil-price'])
    goldPrice = float(formData['gold-price'])
    Inflation = float(formData['inflation'])
    S_Pindex = float(formData['s_p-index'])
    GNI = float(formData['gni'])
    predicted_result = predictTheValue(population, goldPrice, oilPrice, S_Pindex, GNI, Inflation)
    return str(predicted_result)