using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//just for testing purpose of errors handling
public class BuggyController(DataContext context) :BaseApiController
{
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
        var user = context.Users.Find(-1);
        if(user == null) return NotFound();
        return user;
    }

    [HttpGet("server-error")]
    public ActionResult<AppUser> GetServerError()
    {
        var user = context.Users.Find(-1)??throw new Exception("A bad thing has happened");
        return user;
    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("This was not a good request");
    }
}
