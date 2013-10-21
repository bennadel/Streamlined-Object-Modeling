package com.streamlined.casestudy;

import java.io.IOException;
import java.util.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.collections.*;

class TestCollections
{
  public static void main(String args[])
  {
    TreeSet aList = new TreeSet();
    Double d1 = new Double(4.5);
    Double d2 = new Double(5.5);
    Double d3 = new Double(6.5);
    Double d4 = new Double(7.6);
    aList.add(d1);
    aList.add(d2);
    aList.add(d3);
    aList.add(d4);
    
    /* Prints each element in a collection */
    CollectionPerformer listPrinter = new CollectionPerformer()
    {
        public void performBlock(Object listElement, Object keyValue)
        {
            System.out.println("\t" + listElement);
        }
    };
 
    System.out.println("\n" + "Initial List");
    listPrinter.perform(aList);
    
    /* Select all elements in aList whose value is > 6 */
    CollectionSelector aSelector = new CollectionSelector()
    {
        public boolean selectBlock(Object listElement, Object keyValue)
        {
            return ((Double)listElement).doubleValue() > 6;
        }
    };
    
    Collection newCollection = aSelector.select(aList); 
    System.out.println("\n" + "Selected list type: " + newCollection.getClass());
    listPrinter.perform(newCollection);
    
    /* Collect squares of all Doubles in collection */
    CollectionCollector aCollector = new CollectionCollector()
    {
        public Object collectBlock(Object listElement, Object keyValue)
        {
            double value = ((Double)listElement).doubleValue();
            return new Double(value * value);
        }
    };
    
    Collection newCollection2 = aCollector.collect(aList);
    System.out.println("\n" + "Collected list type: " + newCollection2.getClass());
    listPrinter.perform(newCollection2);
    
    /* Detect double who is equals to keyValue */
    CollectionDetector aDetector = new CollectionDetector()
    {
        public boolean detectBlock(Object listElement, Object keyValue)
        {
            return listElement.equals(keyValue);
        }
    };
    
    Double foundDouble = null;
    foundDouble = (Double)aDetector.detect(aList, new Double(6.5));
    System.out.println("\nfound = 6.5: " + foundDouble);
 
    foundDouble = (Double)aDetector.detect(aList, new Double(8.5));
    System.out.println("\nfound = 8.5: " + foundDouble);
    
    /* Sums results into sumValue */
    class SumPerformer extends CollectionPerformer
    {
        public double sumValue = 0;
        public void performBlock(Object listElement, Object keyValue)
        {
            throw new UnsupportedOperationException();
        }
    }
    
    /* Sums values in List */
    SumPerformer aSumPerformer = new SumPerformer()
    {
        public void performBlock(Object listElement, Object keyValue)
        {
            sumValue += ((Double)listElement).doubleValue();
        }
    };
    
    aSumPerformer.perform(aList);
    System.out.println("\nSum:" + aSumPerformer.sumValue);
   
    /* Sum of the squares */
    aSumPerformer = new SumPerformer()
    {
        public void performBlock(Object listElement, Object keyValue)
        {
            double value = ((Double)listElement).doubleValue();
            sumValue += value * value;
        }
    };
    aSumPerformer.perform(aList);
    System.out.println("\nSum of Squares:" + aSumPerformer.sumValue);
    
    System.out.println("\nPress ENTER to exit");
        try {
            System.in.read();
        }
     catch (IOException e) { return; }
  }
}
