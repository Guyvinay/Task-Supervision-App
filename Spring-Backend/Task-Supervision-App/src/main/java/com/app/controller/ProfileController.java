package com.app.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Profile;
import com.app.model.SignInRequest;
import com.app.service.ProfileService;

/*
 
{
    "email":"admin1@gamil.com",
    "name":"Admin admin",
    "password":"1234",
    "role":"admin",
    "profilePic":"asdfg"
}
 
 */

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

	@Autowired
	private ProfileService profileService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	@PostMapping(value = "/createProfile")
	public ResponseEntity<Map<String, Object>> createProfile(@RequestBody Profile profile){
		return new ResponseEntity<Map<String,Object>>(profileService.createProfile(profile), HttpStatus.ACCEPTED);
	}
	
	@GetMapping(value = "/getUserById/{id}")
	public ResponseEntity<?> getUserById(@PathVariable("id")Long id){
		Map<String,Object> map = profileService.getProfileById(id);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value = "/getAllProfiles")
	public ResponseEntity<?> getAllProfiles(){
		Map<String,Object> map = profileService.getAllProfiles();
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value = "/postSignIn")
	public ResponseEntity<?> postSignInRequest(@RequestBody SignInRequest request){
		
		System.out.println(request);
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
				);
		
		 Map<String,Object> map = profileService.generateJwtToken(request.getUsername(),request.getPassword(),authentication.getAuthorities());
		 
		return ResponseEntity.ok(map);
	}
	
	
	
}
