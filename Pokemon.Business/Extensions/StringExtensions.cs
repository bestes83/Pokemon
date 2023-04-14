using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pokemon.Business.Extensions
{
    public static class StringExtensions
    {
        public static string Capitalize(this string str)
        {
            var firstLetter = str.Substring(0, 1).ToUpper();
            var theRest = str.Substring(1, str.Length - 1);
            return $"{firstLetter}{theRest}";

        }
    }
}
