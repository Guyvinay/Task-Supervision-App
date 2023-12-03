package com.app.comms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.app.repository.ProfileRepository;

@Configuration
@EnableWebSocket
public class ChatConfiguration implements WebSocketConfigurer {

	@Autowired ProfileRepository usersRepository;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new CommsWebSocketHandler(), "/chat/{userId}")
		.addInterceptors(new CustomHandshakeInterceptor(usersRepository))
		.setAllowedOrigins("*");
		;
	}

}
