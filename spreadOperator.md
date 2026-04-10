 money().forEach((money:Money) => {
               if(money.account == 'input'){
                //spread operator 
                setRevenue((prev) => [...prev, money])
               }
               else{
                setDebts((prev) => [...prev, money] )
               }
            });
        }