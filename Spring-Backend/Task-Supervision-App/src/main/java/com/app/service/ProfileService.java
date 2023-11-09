package com.app.service;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;

import com.app.model.Profile;

public interface ProfileService {

	public Map<String, Object> createProfile(Profile profile);
	public Map<String, Object> getProfileById(Long id);
	public Map<String, Object> getProfileByEmail(String email);
	public Profile getProfileOnlyByEmail(String email);
	public Map<String, Object> getAllProfiles();
	public Map<String, Object> generateJwtToken(String username, String password, Collection<? extends GrantedAuthority> authorities);
//	public Map<String, Object> generateJwtToken(Authentication authentication );	
}
