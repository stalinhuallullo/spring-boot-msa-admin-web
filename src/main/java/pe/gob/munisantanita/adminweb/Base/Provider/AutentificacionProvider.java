package pe.gob.munisantanita.adminweb.Base.Provider;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.org.apache.bcel.internal.generic.F2D;

import pe.gob.munisantanita.adminweb.Base.Model.AutentificacionUsuario;
import pe.gob.munisantanita.adminweb.Base.Model.Usuario;
import pe.gob.munisantanita.adminweb.Base.Utils.F;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;



@Component
public class AutentificacionProvider implements AuthenticationProvider {
	
@Override
public Authentication authenticate(Authentication authentication ) throws AuthenticationException {
	

        Usuario usr = new Usuario();
        usr.setCuenta(authentication.getName().trim());
        usr.setContrasena(authentication.getCredentials().toString().trim());
        
        Authentication auth = null;

        try {
      		 ObjectMapper objMapper = new ObjectMapper();

	   		 HttpResponse httpResponse = F.post(Helper.apiUsuarios("autentificacion"), objMapper.writerWithDefaultPrettyPrinter().writeValueAsString(usr));
	   		 Map<String,Object> obj = objMapper.readValue(EntityUtils.toString( httpResponse.getEntity()), Map.class);

	   		 
	   		 if(obj.get("estado").equals("OK")) {
	   			List<GrantedAuthority> grantedAuths = new ArrayList<>();
	   			
		   		Map<String,Object> obj_usr =  (Map<String, Object>) obj.get("usuario");
		   		Map<String,Object> obj_usr_rol =  (Map<String, Object>) obj_usr.get("rol"); 
		   		
		   		String nombre_completo = obj_usr.get("nombres").toString() + " " + obj_usr.get("ape_paterno").toString() + " " +obj_usr.get("ape_materno").toString();
		   		int rol_id = Integer.parseInt(obj_usr.get("rol_id").toString());
		   		

	   			 List<Map<String,Object>> modulos =  (ArrayList<Map<String, Object>>) obj_usr_rol.get("modulos");
	   			
	   			String ROL = "ROL";
	   			for (Map<String, Object> mod : modulos){
	   					String MOD = mod.get("modulo_codigo").toString();
	   					grantedAuths.add(new SimpleGrantedAuthority(ROL+"_"+MOD));
	   				
		   			 	List<Map<String,Object>> permisos =  (ArrayList<Map<String, Object>>) mod.get("permisos");
		   			 
			   			for (Map<String, Object> per : permisos){
			   				String SUBMOD = per.get("submodulo_codigo").toString();
		   					grantedAuths.add(new SimpleGrantedAuthority(ROL+"_"+MOD+"_"+SUBMOD));
		   				
			   			 	List<Map<String,Object>> acciones =  (ArrayList<Map<String, Object>>) per.get("acciones");
				   			for (Map<String, Object> acc : acciones)
				   			{
				   				if(Boolean.parseBoolean(acc.get("valor").toString())) {
				   					String ACC = acc.get("nombre").toString();
				   					grantedAuths.add(new SimpleGrantedAuthority(ROL+"_"+MOD+"_"+SUBMOD+"_"+ACC));
				   				}
				   			} 
			   			}
	   			}
	
		   		 System.out.println("listalistalistalista modulos : " + modulos);

		   		 
	   		        AutentificacionUsuario appUser = new AutentificacionUsuario(usr.getCuenta(),usr.getContrasena(), true, true, true, true, grantedAuths, 1, usr.getCuenta()+"@gmail.com", nombre_completo, rol_id);
	   		        auth = new UsernamePasswordAuthenticationToken(appUser, usr.getContrasena(), grantedAuths);
	   	            return auth;
		   		 
	   			 /*
		   	        List<GrantedAuthority> grantedAuths = new ArrayList<>();
		   	        grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
		   	        grantedAuths.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		   	        	
	   		        AutentificacionUsuario appUser = new AutentificacionUsuario(usr.getCuenta(),usr.getContrasena(), true, true, true, true, grantedAuths, 1, "prueba@gmail.com", "Américo Allende", 16);
	   		        auth = new UsernamePasswordAuthenticationToken(appUser, usr.getContrasena(), grantedAuths);
	   	            return auth;
	   	            */
	   			 
	   		 } else 
	             throw new BadCredentialsException(obj.get("mensaje").toString());
	   		 
            
		} catch (ParseException | IOException e) {
			 throw new BadCredentialsException(e.getMessage());
		}
        
        
        
        
        /*
        if (usr.getCuenta().equals("admin2") && usr.getContrasena().equals("admin2")){
        List<GrantedAuthority> grantedAuths = new ArrayList<>();
        grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
        grantedAuths.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        	

	        AutentificacionUsuario appUser = new AutentificacionUsuario(usr.getCuenta(),usr.getContrasena(), true, true, true, true, grantedAuths, 1, "TestEmail@gmail.com", "Américo Allende", 16);
	        auth = new UsernamePasswordAuthenticationToken(appUser, usr.getContrasena(), grantedAuths);
            return auth;
            
        }
        else 
            throw new BadCredentialsException("El nombre de usuario o contraseña es incorrecto.");
		*/
        
    }

    
    
    @Override
    public boolean supports(Class<? extends Object> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
    
    
    
    
    
    
    
    
}
