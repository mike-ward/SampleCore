using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SampleCore.Controllers;

namespace SampleCore.Tests.Controllers
{
    [TestClass]
    public class SampleControllerTests
    {
        [TestMethod]
        public void VersonShouldReturnString()
        {
            var controller = new SampleController();
            controller.Version().Should().Be("0.0.1");
        }
    }
}
