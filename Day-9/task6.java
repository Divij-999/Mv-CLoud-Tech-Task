class GP{
    public void print_grandParent(){
        System.out.println("Grandparent");
    }
}

class P extends GP{
    public void print_parent(){
        System.out.println("Parent");
    }
}


class C extends P{
    public void print_child(){
        System.out.println("Child");
    }
}

public class task6{
    public static void main(String[] args) {
        C child = new C();
        child.print_child();
        child.print_parent();
        child.print_grandParent();
    }
}