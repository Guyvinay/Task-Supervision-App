package com.app.configuration;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.exception.ProfileNotFoundException;
import com.app.model.Profile;
import com.app.repository.ProfileRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProfileUserDetailsService implements UserDetailsService {

	@Autowired private ProfileRepository profileRepository;
		
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
        Optional<Profile> optional = profileRepository.findByEmail(username);
		
		if(optional.isEmpty()) throw new UsernameNotFoundException("User "+username+" Not Found!");
		else {
			Profile profile = optional.get();
			List<GrantedAuthority> authorities = new ArrayList<>();
			authorities.add(new SimpleGrantedAuthority(profile.getRole()) );
			return new User(
					profile.getEmail(),
					profile.getPassword(),
					authorities
					);
		}
		
	}

}
