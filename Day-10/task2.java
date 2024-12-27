// import java.util.ArrayList;

public class task2 {
    public static void main(String[] args) {
        char[] list = {'a','Z','A','D','d','R','l'};
        System.out.println("Before sort : ");
        System.out.println(list);
        for(int i=0 ; i<list.length ; i++){
            for(int j=0 ; j<i;j++){
                if(list[i]>list[j]){
                    char temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
        System.out.println("After sort : ");
        System.out.println(list);
        
    }
}
