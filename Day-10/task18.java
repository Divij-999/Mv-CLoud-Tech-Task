public class task18 {
    public static void main(String[] args) {
        int value = 5 ;
        for(int i = 1 ; i<=value ; i++){
            for(int j = 1 ; j<=4*value ; j++){
                // System.out.println(value-i);
                if(j<=i|| j>(4*value-i)||(j>6&&(j<=(2*value+2-i)))||(j>11&&j<16&&j>=(2*value+i))||(i==value&&j==value+1)){
                    System.out.print("*");
                }
                else{
                    System.out.print(" " );
                }
            }
            System.out.println();
        }
    }
}
