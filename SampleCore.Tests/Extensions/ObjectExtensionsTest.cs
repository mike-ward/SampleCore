using System.Globalization;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SampleCore.Extensions;

namespace SampleCore.Tests.Extensions
{
    [TestClass]
    public class ObjectExtensionsTests
    {
        [TestMethod]
        public void ToStringInvarientShouldConvertDoublesAsDecimal()
        {
            0.000007.ToString(CultureInfo.InvariantCulture).Should().Be("7E-06");
            0.000007.ToStringInvarient().Should().Be("0.000007");

            7123456700000000000.ToString(CultureInfo.InvariantCulture).Should().Be("7123456700000000000");
            7123456700000000000.ToStringInvarient().Should().Be("7123456700000000000");
        }
    }
}