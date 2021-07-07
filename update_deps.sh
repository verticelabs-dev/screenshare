
NC='\033[0m' # No Color
RED='\033[0;31m'

echo "${RED}--- updating vue app deps ---${NC}"
cd app/ && yarn
echo "${RED}--- updating relay server deps ---${NC}"
cd ../relay-server && yarn