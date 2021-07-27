using System;
using System.Linq;
using System.Security.Claims;
using Just_Study.Authorization.Api.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Just_Study.Authorization.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private Guid UserId => 
            Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        [HttpGet]
        [Route("first")]
        public IActionResult First()
        {
            return Ok("all good");
        }
        
        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("second")]
        public IActionResult Second()
        {
            return Ok("all good");
        }
    }
}