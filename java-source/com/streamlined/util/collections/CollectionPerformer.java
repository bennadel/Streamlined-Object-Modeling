package com.streamlined.util.collections;

import java.util.Collection;
import java.util.Iterator;

public abstract class CollectionPerformer
{
    public CollectionPerformer() {}
    public void perform(Collection aCollection) 
    {
        this.perform(aCollection, null);
    }
    public void perform(Collection aCollection, Object keyValue)
    {
        Iterator it = aCollection.iterator();
        while(it.hasNext())
        {
            this.performBlock(it.next(), keyValue);
        }
    }
    public abstract void performBlock(Object anObject, Object keyValue);
}