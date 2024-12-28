using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PriceFetcher
{
    public class Token
    {
        public string Name { get; set; }
        public string PriceUrl { get; set;}
    }

    public class TokenConfig
    {
        public List<Token> Tokens { get; set; }
    }
}
