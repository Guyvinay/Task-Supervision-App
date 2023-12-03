package com.app.comms;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.app.model.Profile;
import com.app.repository.ProfileRepository;

import lombok.AllArgsConstructor;
@AllArgsConstructor
public class CustomHandshakeInterceptor implements HandshakeInterceptor  {

	private ProfileRepository usersRepository;
	
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		String uri = request.getURI().toString();
		int lastIndexOf = uri.lastIndexOf("/");
		String userEmail = uri.substring(lastIndexOf+1);
		System.out.println(userEmail);
		Profile user = usersRepository.findByEmail(userEmail).orElse(null);
		return user!=null;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			@Nullable Exception exception) {}

}
