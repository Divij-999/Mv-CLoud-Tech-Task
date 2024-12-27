import java.util.ArrayList;

public class task8 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<Integer>();
        for(int i = 0 ; i<=5; i++){
            list.add(i);
        }

        System.out.println("OurList : "+list);
        boolean odd = true;
        for(int i=0;i<list.size();i++){
            if(i%2==0){
                System.out.println("List contains even integer");
                odd = false;
                break;
            }
        }
        if(odd){
            System.out.println("List contains only odd integer");
            
        }
        
    }
}
