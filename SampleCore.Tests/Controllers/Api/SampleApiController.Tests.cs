using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SampleCore.Controllers.Api;

namespace SampleCore.Tests.Controllers.Api
{
    [TestClass]
    public class SampleControllerTests
    {
        [TestMethod]
        public void VersonShouldReturnString()
        {
            var controller = new SampleApiController();
            controller.Version().Should().Be("0.0.1");
        }
    }
}
