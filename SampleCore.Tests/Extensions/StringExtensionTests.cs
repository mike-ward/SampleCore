using System;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SampleCore.Extensions;

namespace SampleCore.Tests.Extensions
{
    [TestClass]
    public class StringExtensionTests
    {
        [TestMethod]
        public void HashPasswordReturnsExpectedValue()
        {
            var salt = Guid.NewGuid();
            "SuperSecretPasword".HashPassword(salt).Length.Should().Be(32);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void HashPasswordFaultsWithNullPassword()
        {
            string password = null;
            var salt = Guid.NewGuid();
            password.HashPassword(salt);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void HashPasswordFaultsWithEmptySalt()
        {
            "Secret".HashPassword(Guid.Empty);
        }

        [TestMethod]
        public void IsEqualToTest()
        {
            "OK".IsEqualTo("OK").Should().BeTrue();
            "NotOK".IsEqualTo("OK").Should().BeFalse();
        }

        [TestMethod]
        public void IsNotEqualToTest()
        {
            "OK".IsNotEqualTo("OK").Should().BeFalse();
            "NotOK".IsNotEqualTo("OK").Should().BeTrue();
        }

        [TestMethod]
        public void IsEqualToIgnoreCaseTest()
        {
            "OK".IsEqualToIgnoreCase("Ok").Should().BeTrue();
            "NotOk".IsEqualToIgnoreCase("OK").Should().BeFalse();
        }

        [TestMethod]
        public void IsNotEqualToIgnoreCaseTest()
        {
            "OK".IsNotEqualToIgnoreCase("Ok").Should().BeFalse();
            "NotOk".IsNotEqualToIgnoreCase("OK").Should().BeTrue();
        }
    }
}