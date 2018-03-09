using System;
using System.Collections.Generic;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SampleCore.Helpers;

namespace SampleCore.Tests.Helpers
{
    [TestClass]
    public class RequireTests
    {
        [TestMethod]
        public void RequireNotNullShouldThow()
        {
            Action require = () => Require.NotNull(null, "");
            require.Should().Throw<NullReferenceException>();
        }

        [TestMethod]
        public void RequireNotNullShouldNotThow()
        {
            Action require = () => Require.NotNull("x", "x");
            require.Should().NotThrow();
        }

        [TestMethod]
        public void RequireArgumentNotNullShouldThrow()
        {
            Action require = () => Require.ArgumentNotNull(null, null);
            require.Should().Throw<ArgumentNullException>();
        }

        [TestMethod]
        public void RequireArgumentNotNullShouldNotThrow()
        {
            Action require = () => Require.ArgumentNotNull("x", "x");
            require.Should().NotThrow();
        }

        [TestMethod]
        public void RequireArgumentNotNullOrEmptyShouldThrow()
        {
            Action require = () => Require.ArgumentNotNullEmpty(null, null);
            require.Should().Throw<ArgumentException>().Where(e => e.Message.StartsWith("null"));
        }

        [TestMethod]
        public void RequireArgumentNotNullOrEmptyShouldNotThrow()
        {
            Action require = () => Require.ArgumentNotNullEmpty("x", "x");
            require.Should().NotThrow();
        }

        [TestMethod]
        public void IsEmptyWithNull()
        {
            Action require = () => Require.IsEmpty((IEnumerable<string>) null, "t");
            require.Should().NotThrow();
        }

        [TestMethod]
        public void IsEmptyWithEmpty()
        {
            Action require = () => Require.IsEmpty(new string[0], "t");
            require.Should().NotThrow();
        }

        [TestMethod]
        public void IsEmptyWithNotEmpty()
        {
            Action require = () => Require.IsEmpty(new[] { "" }, "t");
            require.Should().Throw<ArgumentException>();
        }

        [TestMethod]
        public void IsNotEmptyWithNull()
        {
            Action require = () => Require.IsNotEmpty((IEnumerable<string>) null, "t");
            require.Should().Throw<ArgumentException>();
        }

        [TestMethod]
        public void IsNotEmptyWithEmpty()
        {
            Action require = () => Require.IsNotEmpty(new string[0], "t");
            require.Should().Throw<ArgumentException>();
        }

        [TestMethod]
        public void IsNotEmptyWithNotEmpty()
        {
            Action require = () => Require.IsNotEmpty(new[] { "" }, "t");
            require.Should().NotThrow();
        }

        [TestMethod]
        public void IsInRangeShouldWorkWithCorrectValues()
        {
            const int id = 0;
            Action require = () => Require.ArgumentInRange(id, 0, int.MaxValue, nameof(id));
            require.Should().NotThrow();
        }

        [TestMethod]
        public void IsInRangeShouldWorkThrowWhenBelowMin()
        {
            const int id = -1;
            Action require = () => Require.ArgumentInRange(id, 0, 10, nameof(id));
            require.Should().Throw<ArgumentOutOfRangeException>()
                .WithMessage("0 < -1 < 10*");
        }

        [TestMethod]
        public void IsInRangeShouldWorkThrowAboveMax()
        {
            const int id = 11;
            Action require = () => Require.ArgumentInRange(id, 0, 10, nameof(id));
            require.Should().Throw<ArgumentOutOfRangeException>()
                .WithMessage("0 < 11 < 10*");
        }

        [TestMethod]
        public void IsInRangeDoubleShouldWorkWithCorrectValues()
        {
            const double id = 20.1;
            Action require = () => Require.ArgumentInRange(id, 0, int.MaxValue, nameof(id));
            require.Should().NotThrow();
        }

        [TestMethod]
        public void IsInRangeDoubleShouldWorkThrowWhenBelowMin()
        {
            const double id = -1.1;
            Action require = () => Require.ArgumentInRange(id, 0, 10, nameof(id));
            require.Should().Throw<ArgumentOutOfRangeException>()
                .WithMessage("0 < -1.1 < 10*");
        }

        [TestMethod]
        public void IsInRangeDoubleShouldWorkThrowAboveMax()
        {
            const double id = 10.1;
            Action require = () => Require.ArgumentInRange(id, 0, 10, nameof(id));
            require.Should().Throw<ArgumentOutOfRangeException>()
                .WithMessage("0 < 10.1 < 10*");
        }

        [TestMethod]
        public void RequireTrueShouldPass()
        {
            Require.True(() => true);
        }

        [TestMethod]
        public void RequireTrueShouldFail()
        {
            Action require = () => Require.True(() => false);
            require.Should().Throw<InvalidProgramException>();
        }

        [TestMethod]
        public void RequireFalseShouldPass()
        {
            Require.False(() => false);
        }

        [TestMethod]
        public void RequireFalseShouldFail()
        {
            Action require = () => Require.False(() => true);
            require.Should().Throw<InvalidProgramException>();
        }
    }
}