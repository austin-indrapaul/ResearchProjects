from analysis import dataprocessor
from analysis.dataprocessor import *
from models.GraphComponent import *
from models.PredictorRequestComponent import *
from models.PredictorResponseComponent import *

def getYearVersusPopulationInfo():
    images_path = dataprocessor.getYearVersusGraph("population")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("A pair plot is used to visualize the relationship between multiple variables in a "
                        "pairwise manner. Seaborn provides the pairplot() function to create pair plots. Pair plots display scatter plots for each pair of variables in the dataset, along with histograms on the diagonal. "
                        "They are helpful for exploring relationships and dependencies between variables.")
    info.setExternalLink("https://data.worldbank.org/indicator/SP.POP.TOTL?locations=US")
    return info

def getYearVersusInflationInfo():
    images_path = dataprocessor.getYearVersusGraph("Inflation")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("A pair plot is used to visualize the relationship between multiple variables in a "
                        "pairwise manner. Seaborn provides the pairplot() function to create pair plots. Pair plots display scatter plots for each pair of variables in the dataset, along with histograms on the diagonal. "
                        "They are helpful for exploring relationships and dependencies between variables.")

    info.setExternalLink("https://www.usinflationcalculator.com/inflation/current-inflation-rates/")
    return info

def getYearVersusGoldPriceInfo():
    images_path = dataprocessor.getYearVersusGraph("Gold price")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("A pair plot is used to visualize the relationship between multiple variables in a "
                        "pairwise manner. Seaborn provides the pairplot() function to create pair plots. Pair plots display scatter plots for each pair of variables in the dataset, along with histograms on the diagonal. "
                        "They are helpful for exploring relationships and dependencies between variables.")

    info.setExternalLink("https://in.investing.com/commodities/gold-historical-data?interval_sec=monthly")
    return info

def getYearVersusOilPriceInfo():
    images_path = dataprocessor.getYearVersusGraph("Oil price")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("A pair plot is used to visualize the relationship between multiple variables in a "
                        "pairwise manner. Seaborn provides the pairplot() function to create pair plots. Pair plots display scatter plots for each pair of variables in the dataset, along with histograms on the diagonal. "
                        "They are helpful for exploring relationships and dependencies between variables.")

    info.setExternalLink("https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=pet&s=f000000__3&f=m")
    return info


def getYearVersusS_PindexInfo():
    images_path = dataprocessor.getYearVersusGraph("S&P index")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("A pair plot is used to visualize the relationship between multiple variables in a "
                        "pairwise manner. Seaborn provides the pairplot() function to create pair plots. Pair plots display scatter plots for each pair of variables in the dataset, along with histograms on the diagonal. "
                        "They are helpful for exploring relationships and dependencies between variables.")

    info.setExternalLink("https://in.investing.com/indices/us-spx-500-historical-data")
    return info


def getYearVersusGNIInfo():
    images_path = dataprocessor.getYearVersusGraph("GNI")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("A pair plot is used to visualize the relationship between multiple variables in a "
                        "pairwise manner. Seaborn provides the pairplot() function to create pair plots. Pair plots display scatter plots for each pair of variables in the dataset, along with histograms on the diagonal. "
                        "They are helpful for exploring relationships and dependencies between variables.")

    info.setExternalLink("https://data.worldbank.org/indicator/NY.GNP.PCAP.CD")
    return info


def getYearVersusRealestateindexInfo():
    images_path = dataprocessor.getYearVersusGraph("Realestate index")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("A pair plot is used to visualize the relationship between multiple variables in a "
                        "pairwise manner. Seaborn provides the pairplot() function to create pair plots. Pair plots display scatter plots for each pair of variables in the dataset, along with histograms on the diagonal. "
                        "They are helpful for exploring relationships and dependencies between variables.")

    info.setExternalLink("https://in.investing.com/indices/dj-real-estate-historical-data")
    return info

def getYearVersusITindexInfo():
    images_path = dataprocessor.getYearVersusGraph("IT index")
    info = GraphComponent()
    for img_path in images_path:
        info.setImagePath(img_path)
    info.setDescription("A pair plot is used to visualize the relationship between multiple variables in a "
                        "pairwise manner. Seaborn provides the pairplot() function to create pair plots. Pair plots display scatter plots for each pair of variables in the dataset, along with histograms on the diagonal. "
                        "They are helpful for exploring relationships and dependencies between variables.")

    info.setExternalLink("https://in.investing.com/indices/nasdaq-composite-historical-data")
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
