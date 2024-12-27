import java.util.Scanner;
import java.util.ArrayList;

public class task10 {
    public static void main(String[] args) {
        
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter your number : ");   
        String value = sc.nextLine();

        ArrayList<String> list = new ArrayList<String>();
        int index = value.length() ;
        String temp = "";
        for(int i = 0 ; i<value.length() ; i++){
            if(value.charAt(i) == '.'){
                index = i;
            }
            else if(i>index){
                temp+=value.charAt(i);
            }
            else{
                list.add(value.charAt(i)+"");
            }
        }
        list.add(temp);
        System.out.println(list);

        //Reversing string
        String outpuString = "";
        for(int i = 0 ; i<list.size();i++){
            if(i==(list.size()-index+1)){
                outpuString+="."+list.get((list.size()-1)-i);
            }
            else{
                outpuString+=list.get((list.size()-1)-i);
            }
        }

        System.out.println("Output : "+outpuString);

        sc.close();

    }
}
