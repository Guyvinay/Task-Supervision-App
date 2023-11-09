package com.app.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(TaskNotFoundException.class)
	public ResponseEntity<ExceptionDefinition> taskNotFoundException(TaskNotFoundException ex, WebRequest wb){
		return new ResponseEntity<ExceptionDefinition>(new ExceptionDefinition(
				LocalDateTime.now(),
				ex.getMessage(),
				wb.getDescription(false)
				),
				HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ExceptionDefinition> noHandlerExceptionHandler(NoHandlerFoundException ex, WebRequest wb) {
		return new ResponseEntity<ExceptionDefinition>(new ExceptionDefinition(
				LocalDateTime.now(),
				ex.getMessage(),
				wb.getDescription(false)
				),
				HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDefinition> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex, WebRequest wb) {
		return new ResponseEntity<ExceptionDefinition>(new ExceptionDefinition(
				LocalDateTime.now(),
				ex.getMessage(),
				wb.getDescription(false)
				),
				HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionDefinition> globalExceptionHandler(Exception ex, WebRequest wb){
		return new ResponseEntity<ExceptionDefinition>(new ExceptionDefinition(
				LocalDateTime.now(),
				ex.getMessage(),
				wb.getDescription(false)
				),
				HttpStatus.BAD_REQUEST);
	}
	
}
