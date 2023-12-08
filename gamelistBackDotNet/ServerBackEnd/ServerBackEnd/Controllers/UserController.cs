using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ServerBackEnd.Models;
using ServerBackEnd.Services;

namespace ServerBackEnd.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UserController : ControllerBase
    {
        private readonly UsersService _usersService;
        
        public UserController(UsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("/MyProfil/{id}")]
        public async Task<IActionResult> GetProfil(string id)
        {
            if (id.IsNullOrEmpty())
                return Conflict();
            
            var userToSend = new UpdateUserModel();
            var user = await _usersService.GetAsync(id);
            userToSend.id = user.Id;
            userToSend.pseudo = user.Pseudo;
            userToSend.email = user.Email;
            userToSend.password = "";
            userToSend.repassword = "";
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(userToSend);
            return Ok(json);
        }


        [HttpPost("/update")]
        public async Task<IActionResult> Update([FromBody] UpdateUserModel userfront)
        {
            UserModel user = null;
            bool? isPseudoExist = null;
            bool? isEmailExist = null;

            if (userfront != null && userfront.id != null)
                user = await _usersService.GetAsync(userfront.id);
            else
                return NotFound();

            if(user != null && user.Pseudo != null && user.Pseudo != userfront.pseudo)
                isPseudoExist = await _usersService.CheckIfPseudoExistsAsync(userfront.pseudo);

            if (user != null && user.Email != null && user.Email != userfront.email)
                isEmailExist = await _usersService.CheckIfEmailExistsAsync(userfront.email);

            if ((isEmailExist != null && (bool)isEmailExist) || (isPseudoExist != null && (bool)isPseudoExist))
                return Conflict("Le pseudo ou l'email utilisé existe déjà.");
            else
            {
                try
                {
                    if(userfront.pseudo != "")
                        user.Pseudo = userfront.pseudo;

                    if (userfront.email != "")
                        user.Email = userfront.email;

                    if(userfront.password != "" && userfront.repassword != "" && userfront.password != userfront.repassword)
                        return StatusCode(500, $"Erreur lors de la mise à jours de l'utilisateur : les mots de passes ne sont pas identiques");

                    user.Password = _usersService.HashPassword(userfront.password);
                    
                    if(user.Id != string.Empty && user.Id != null)
                        await _usersService.UpdateAsync(user.Id,user);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Erreur lors de la mise à jours de l'utilisateur : {ex.Message}"); ;
                }
            }

            return Ok();
        }
    }
}
