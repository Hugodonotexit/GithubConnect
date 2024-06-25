#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <random>
using namespace std;

int main() {
    random_device seed;
    mt19937_64 gen(seed());
    std::vector<std::string> lines;
    std::string line;
    
    ifstream input("depressingQuote.txt");
    if (!input) {
        std::cerr << "Unable to open file example.txt";
        return 1; // Return an error code
    }

    while (std::getline(input, line)) {
        lines.push_back(line);
    }
    input.close();

    uniform_int_distribution<> rnd(0, lines.size()-1);

    cout << lines[rnd(gen)] << endl;
    return 0;
}