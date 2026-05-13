using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkforceManagement.Api.Data;
using WorkforceManagement.Api.DTOs;
using WorkforceManagement.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace WorkforceManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/employees
        [HttpGet]
        [Authorize(Roles = "Admin,Manager")] // Only Admin or Manager
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employees.ToListAsync();
            return Ok(employees);
        }

        // GET: api/employees/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        // POST: api/employees
        [HttpPost]
        [Authorize(Roles = "Admin")] // Only Admin can create
        public async Task<IActionResult> Create(CreateEmployeeDto dto)
        {
            var employee = new Employee
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                DepartmentId = dto.DepartmentId
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return Ok(employee);
        }

        // PUT: api/employees/update/5
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")] // Only Admin
        public async Task<IActionResult> Update(int id, UpdateEmployeeDto dto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();

            employee.FirstName = dto.FirstName;
            employee.LastName = dto.LastName;
            employee.Email = dto.Email;
            employee.DepartmentId = dto.DepartmentId;

            await _context.SaveChangesAsync();
            return Ok(employee);
        }

        // DELETE: api/employees/delete/5
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")] // Only Admin
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}