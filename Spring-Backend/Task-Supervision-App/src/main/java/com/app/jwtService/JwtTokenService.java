package com.app.jwtService;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtTokenService {

	public String generateToken(UserDetails userDetails) {
        SecretKey key = Keys.hmacShaKeyFor(JwtVars.JWT_KEY.getBytes());
       String token = Jwts
				        .builder()
				        .setIssuer("VINAY")
				        .setSubject("JWT Token")
				        .claim("username", userDetails.getUsername())
				        .claim("authorities", populateAuthorities(userDetails.getAuthorities()))
						.setIssuedAt(new Date())
						.setExpiration(new Date(new Date().getTime()+ 30000000)) 						.signWith(key,SignatureAlgorithm.HS256)
						.compact();
//		log.info(token);
		return token;
	}	
	
   private String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
        
    	Set<String> authoritiesSet = new HashSet<>();
        
        for (GrantedAuthority authority : collection) {
            authoritiesSet.add(authority.getAuthority());
        }
        return String.join(",", authoritiesSet);
   
    
    }
	
}
