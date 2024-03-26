from testalgo import run_algo


def main():

    results = run_algo(['GOOG', 'TSLA', 'MSFT', 'AAPL'], '2022-03-23', '2024-03-25', '5', '500900', '0.20', '0.30')

    print (results) # print your selected df directly from here




if __name__ == "__main__":
    main()