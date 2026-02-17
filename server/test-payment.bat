@echo off
echo ==================================================
echo Test du flux complet de paiement
echo ==================================================
echo.

curl -X POST http://localhost:5000/api/webhook/test-payment ^
-H "Content-Type: application/json" ^
-d "{\"session\": {\"id\": \"cs_test_SIMULATION\", \"customer\": \"cus_test\", \"customer_details\": {\"email\": \"toyatankwajoelsorel@gmail.com\", \"name\": \"Joel Toya\"}, \"subscription\": \"sub_test\", \"amount_total\": 179900, \"currency\": \"eur\", \"payment_intent\": \"pi_test\", \"line_items\": {\"data\": [{\"price\": {\"id\": \"price_1SwPhbE7xgnUSKkwi2BYG764\"}}]}}}"

echo.
echo.
echo ==================================================
echo Verifiez votre boite mail: toyatankwajoelsorel@gmail.com
echo ==================================================
pause
