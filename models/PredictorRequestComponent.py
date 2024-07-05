class PredictorRequestComponent:
    def __init__(self):
        self.population = None
        self.oilPrice = None
        self.goldPrice = None
        self.inflation = None
        self.S_Pindex = None
        self.GNI = None

    def setPopulation(self, population):
        self.population = population

    def setOilPrice(self, oilPrice):
        self.oilPrice= oilPrice

    def setGoldPrice(self, goldPrice):
        self.goldPrice = goldPrice

    def setInflation(self, inflation):
        self.inflation = inflation

    def setOilPrice(self, s_pindex):
        self.S_Pindex = s_pindex

    def setGoldPrice(self, gni):
        self.GNI = gni