package com.streamlined.util.collections;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Iterator;

public abstract class CollectionCollector
{
    public CollectionCollector() {}
    public Collection collect(Collection aCollection) 
    {
        return this.collect(aCollection, null);
    }
    public Collection collect(Collection aCollection, Object keyValue)
    {
        Iterator it = aCollection.iterator();
        Collection newCollection = null;
        try
        {
            newCollection = (Collection)aCollection.getClass().newInstance();
        }
        catch (IllegalAccessException  ex)
        {
            newCollection =  new ArrayList();
        }
        catch (InstantiationException  ex)
        {
            newCollection =  new ArrayList();
        }
        while(it.hasNext())
        {
            newCollection.add(this.collectBlock(it.next(), keyValue));
        }
        return newCollection;
    }
    public abstract Object collectBlock(Object anObject, Object keyValue);
}
    
