package com.streamlined.util.exceptions;

public class BusinessRuleException extends Exception
{
   public BusinessRuleException()
   {
      super();
   }
   
   public BusinessRuleException(String message)
   {
      super(message);
   }
}
