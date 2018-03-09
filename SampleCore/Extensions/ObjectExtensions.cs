using System;
using System.Globalization;

namespace SampleCore.Extensions
{
    public static class ObjectExtensions
    {
        public static string ToStringInvarient(this object item)
        {
            return item is double d
                ? d.ToString("0.###################", CultureInfo.InvariantCulture) // Insure numbers like 7E-06 are expressed as 0.000007
                : Convert.ToString(item, CultureInfo.InvariantCulture);
        }
    }
}