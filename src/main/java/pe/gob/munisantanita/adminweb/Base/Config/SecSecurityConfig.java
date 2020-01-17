package pe.gob.munisantanita.adminweb.Base.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import pe.gob.munisantanita.adminweb.Base.Provider.AutentificacionProvider;


@Configuration
@EnableWebSecurity
public class SecSecurityConfig extends WebSecurityConfigurerAdapter {
	

	@Autowired
	private AutentificacionProvider autentificacionProvider;
	
    String[] resources = new String[]{
            "/cdn/**","/css/**","/icons/**","/img/**","/js/**","/api/**","/directorio/**"
    };
	
   /*
    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("admin").password("{noop}admin").roles("admin");

    }
    */


    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .authenticationProvider(this.autentificacionProvider);
    }
 
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
    	
    	http
    	.authorizeRequests()
    	.antMatchers(resources).permitAll()  
		.antMatchers("/","/login").permitAll()
		.antMatchers("/**")
        .authenticated()
        .and()
       .formLogin()
        .failureUrl("/login?error")
        .loginPage("/login")
        //.loginProcessingUrl("/j_spring_security_check")
        .defaultSuccessUrl("/dashboard", true)
        .usernameParameter("username")
        .passwordParameter("password")
        .permitAll()
        .and()
       .logout()
        .permitAll()
        .logoutSuccessUrl("/login") //?logout
        .and()
        .csrf().disable();
    	
    	
    	/*
    	 http
         .authorizeRequests()
	        .antMatchers(resources).permitAll()  
	        .antMatchers("/","/login","/admin/login").permitAll()
	        //.antMatchers("/admin*").access("hasRole('ADMIN')")
	        //.antMatchers("/user*").access("hasRole('USER') or hasRole('ADMIN')")
             .anyRequest().authenticated()
             .and()
            .formLogin()
             .failureUrl("/admin/login?error")
             .loginPage("/admin/login")
             //.loginProcessingUrl("/j_spring_security_check")
             .defaultSuccessUrl("/admin/principal", true)
             .usernameParameter("username")
             .passwordParameter("password")
             .permitAll()
             .and()
         .logout()
             .permitAll()
             .logoutSuccessUrl("/admin/login") //?logout
             .and()
             .csrf().disable()
             ; //.httpBasic();
    	 */
    	 
    }
     
 
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    
}
