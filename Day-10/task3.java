import java.util.ArrayList;
import java.util.Arrays;

public class task3 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<Integer>(Arrays.asList(98,32,72,94,75,73,92,36,28,34));
        // list.addAll();
        
        System.out.println("Before sort : ");
        System.out.println(list);
        for(int i=0 ; i<list.size() ; i++){
            for(int j=0 ; j<i;j++){
                if(list.get(i)>list.get(j)){
                    int temp = list.get(i);
                    list.set(i,list.get(j));
                    list.set(j,temp);
                }
            }
        }
        System.out.println("Second larget value : "+list.get(1));
        
    }
}
