package pe.gob.munisantanita.adminweb.Base.Utils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import pe.gob.munisantanita.adminweb.Base.Model.AutentificacionUsuario;



@Component
public class Cuenta {
	
    private static volatile Cuenta sCuenta;
    private static Map<String, Map<String, Map<String, Boolean>>> PERMISOS;
    
    private Cuenta(){
        if (sCuenta != null){
            throw new RuntimeException("Use el método getInstance () para obtener la única instancia de esta clase.");
        }

    }

    public static Cuenta getInstance() {
        if (sCuenta == null) { 
            synchronized (Cuenta.class) {
                if (sCuenta == null) sCuenta = new Cuenta();
            }
        }

        return sCuenta;
    }

    protected Cuenta readResolve() {
        return getInstance();
    }
	public static AutentificacionUsuario sesion() {       
			return (AutentificacionUsuario)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}  
	  
	
	public static Boolean esPermitido(String ROL) {
		return Cuenta.sesion().getAuthorities().contains(new SimpleGrantedAuthority(ROL));
	}
	
	
	public static Map<String, Map<String, Map<String, Boolean>>> Permisos() {
		  if (PERMISOS == null) {
	        try {
	      		HttpResponse httpResponse = F.get(Helper.apiUsuarios("rol/"+Cuenta.sesion().getRol_id()));
	      		//ObjectMapper objectMapper = new ObjectMapper();
	      		String r = EntityUtils.toString( httpResponse.getEntity());
	      		//Object lista = objectMapper.readValue(r, Object.class);

	      		JsonObject jsonObject = new JsonParser().parse(r).getAsJsonObject();
	      	    JsonArray jarray = jsonObject.getAsJsonArray("modulos");
	      	    PERMISOS = new HashMap<>();
	      	  	if(jarray != null)
		      	  for (JsonElement pa : jarray) {
		      		  	JsonObject obj = pa.getAsJsonObject();
	
		                String mod_cod = obj.get("modulo_codigo").getAsString();
		                HashMap<String, Map<String, Boolean>> mapSubMod = new HashMap<>();

			      	      JsonArray ArrSubmodulos = obj.getAsJsonArray("permisos");
			      	      if(ArrSubmodulos != null)
				      	  for (JsonElement sub : ArrSubmodulos) {
				      		  	JsonObject obj_sub = sub.getAsJsonObject();
					      	    
				      		  	HashMap<String, Boolean> mapAcc = new HashMap<>();
				      		  	String sub_cod = obj_sub.get("submodulo_codigo").getAsString();
					      	    JsonArray ArrAcciones = obj_sub.getAsJsonArray("acciones");
					      	    if(ArrAcciones != null)
						      	for (JsonElement acc : ArrAcciones) {
						      		 JsonObject obj_acc = acc.getAsJsonObject();
						      		 String nombre = obj_acc.get("nombre").getAsString();
						      		 Boolean valor = obj_acc.get("valor").getAsBoolean();
						      		  	mapAcc.put(nombre, valor);
						      	}
						      	mapSubMod.put(sub_cod, mapAcc);

				      	  }
			      	    PERMISOS.put(mod_cod, mapSubMod);
		          }
		      		
	            return PERMISOS;

	   		} catch (ParseException | IOException e) {
	   			System.out.println("UsuarioRepositoryImpl/findRol: "+e.getMessage());
	   			e.printStackTrace();
	   		}
	   		return null;
		  }
		  return PERMISOS;
	 }
	
	

}
